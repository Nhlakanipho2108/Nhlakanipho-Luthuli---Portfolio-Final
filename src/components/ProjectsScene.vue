<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const props = defineProps({ projects: { type: Array, required: true } })
const emit = defineEmits(['select-project'])
const projectColors = ['#76e0d0', '#ff3c79', '#f6bd60', '#ff866b', '#76e0d0', '#f6bd60', '#ff3c79', '#76e0d0', '#ff866b']
const sceneHost = ref(null)
const selectedIndex = ref(-1)
let renderer
let resizeObserver
let animationFrame = 0
let reducedMotion
let motionHandler
let pointerHandler
let pointerLeaveHandler
let clickHandler
let scene
let camera
let globe
let starField
const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
const projectMarkers = []
const projectTargets = []
const timer = new THREE.Timer()

function createProjectLabel(project, index, color) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 112
  const context = canvas.getContext('2d')
  context.beginPath()
  context.roundRect(4, 4, 504, 104, 28)
  context.fillStyle = 'rgba(18, 17, 21, 0.96)'
  context.fill()
  context.strokeStyle = `${color}bb`
  context.lineWidth = 3
  context.stroke()
  context.beginPath()
  context.arc(40, 56, 23, 0, Math.PI * 2)
  context.fillStyle = color
  context.fill()
  context.fillStyle = '#151318'
  context.font = '700 23px Poppins, sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(String(index + 1).padStart(2, '0'), 40, 57)
  context.fillStyle = '#f8f6f8'
  context.font = '600 27px Poppins, sans-serif'
  context.textAlign = 'left'
  context.fillText(project.title, 78, 58, 408)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const label = new THREE.Sprite(new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  }))
  label.scale.set(2.16, 0.47, 1)
  label.renderOrder = 2
  return label
}

function addProjectMarker(project, index, count) {
  const y = 1 - ((index + 0.5) / count) * 2
  const radius = Math.sqrt(1 - y * y)
  const angle = index * Math.PI * (3 - Math.sqrt(5))
  const normal = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius).normalize()
  const color = projectColors[index % projectColors.length]
  const marker = new THREE.Group()
  marker.position.copy(normal).multiplyScalar(1.39)
  marker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.13, 0.014, 8, 32),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }),
  )
  marker.add(halo)

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 16, 12),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.7, metalness: 0.2, roughness: 0.3 }),
  )
  dot.position.z = 0.035
  marker.add(dot)

  const target = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 12, 10),
    new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, transparent: true, opacity: 0 }),
  )
  target.position.z = 0.035
  target.userData.projectIndex = index
  marker.add(target)
  globe.add(marker)

  const label = createProjectLabel(project, index, color)
  label.position.copy(normal).multiplyScalar(1.91)
  label.visible = false
  globe.add(label)
  projectTargets.push(target)
  projectMarkers.push({ marker, dot, halo, label, target, normal, index })
}

function createStarField() {
  const positions = []
  const colors = []
  const palette = [new THREE.Color('#ff3c79'), new THREE.Color('#76e0d0'), new THREE.Color('#f6bd60')]

  for (let index = 0; index < 150; index += 1) {
    const angle = index * 2.39996
    const radius = 1.5 + ((index * 37) % 100) / 22
    positions.push(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.55, -1.4 - ((index * 13) % 35) / 10)
    const color = palette[index % palette.length]
    colors.push(color.r, color.g, color.b)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  return new THREE.Points(geometry, new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    sizeAttenuation: true,
  }))
}

function renderFrame() {
  timer.update()
  const elapsed = timer.getElapsed()
  globe.rotation.y = elapsed * 0.19 + pointer.x * 0.055
  globe.rotation.x = Math.sin(elapsed * 0.18) * 0.12 - pointer.y * 0.035
  starField.rotation.z = elapsed * 0.008

  globe.updateMatrixWorld(true)
  projectMarkers.forEach(({ dot, halo, label, target, normal, index }) => {
    const facingViewer = normal.clone().applyQuaternion(globe.quaternion).z > 0.04
    label.visible = facingViewer
    target.visible = facingViewer
    const selected = index === selectedIndex.value
    const pulse = Math.sin(elapsed * 2.5 + index) * 0.06
    dot.scale.setScalar(selected ? 1.32 + pulse : 1 + pulse)
    halo.scale.setScalar(selected ? 1.2 : 1)
  })

  renderer.render(scene, camera)
}

function animate() {
  animationFrame = window.requestAnimationFrame(animate)
  if (!document.hidden) renderFrame()
}

function resizeScene() {
  if (!sceneHost.value || !renderer || !camera) return
  const { clientWidth, clientHeight } = sceneHost.value
  if (!clientWidth || !clientHeight) return
  camera.aspect = clientWidth / clientHeight
  camera.position.z = clientWidth < 560 ? 7.5 : 6.6
  camera.updateProjectionMatrix()
  renderer.setSize(clientWidth, clientHeight, false)
  renderFrame()
}

function handleMotionPreference() {
  window.cancelAnimationFrame(animationFrame)
  if (reducedMotion.matches) renderFrame()
  else animate()
}

function handlePointerMove(event) {
  const bounds = sceneHost.value.getBoundingClientRect()
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
  pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
  raycaster.setFromCamera(pointer, camera)
  const hit = raycaster.intersectObjects(projectTargets, false)[0]
  sceneHost.value.style.cursor = hit ? 'pointer' : 'grab'
}

function handlePointerLeave() {
  pointer.set(0, 0)
  if (sceneHost.value) sceneHost.value.style.cursor = 'grab'
}

function selectProject(index) {
  const project = props.projects[index]
  if (!project) return
  selectedIndex.value = index
  emit('select-project', project)
}

function handleSceneClick(event) {
  const bounds = sceneHost.value.getBoundingClientRect()
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
  pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
  raycaster.setFromCamera(pointer, camera)
  const hit = raycaster.intersectObjects(projectTargets, false)[0]
  if (hit) selectProject(hit.object.userData.projectIndex)
}

onMounted(() => {
  const host = sceneHost.value
  if (!host) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.set(0, 0, 6.6)
  globe = new THREE.Group()
  scene.add(globe)

  scene.add(new THREE.AmbientLight(0xffffff, 1.65))
  const pinkLight = new THREE.PointLight(0xff3c79, 8, 10)
  pinkLight.position.set(-3.5, 2.5, 3)
  scene.add(pinkLight)
  const cyanLight = new THREE.PointLight(0x76e0d0, 6, 9)
  cyanLight.position.set(3, -2, 2)
  scene.add(cyanLight)

  const globeSurface = new THREE.Mesh(
    new THREE.SphereGeometry(1.38, 48, 36),
    new THREE.MeshStandardMaterial({ color: 0x142a30, emissive: 0x071b20, emissiveIntensity: 0.8, metalness: 0.42, roughness: 0.34 }),
  )
  globe.add(globeSurface)

  const globeGrid = new THREE.Mesh(
    new THREE.SphereGeometry(1.4, 24, 16),
    new THREE.MeshBasicMaterial({ color: 0x76e0d0, wireframe: true, transparent: true, opacity: 0.2 }),
  )
  globe.add(globeGrid)

  const equator = new THREE.Mesh(
    new THREE.TorusGeometry(1.42, 0.009, 6, 96),
    new THREE.MeshBasicMaterial({ color: 0xff3c79, transparent: true, opacity: 0.48 }),
  )
  equator.rotation.x = Math.PI / 2
  globe.add(equator)

  const meridian = new THREE.Mesh(
    new THREE.TorusGeometry(1.42, 0.007, 6, 96),
    new THREE.MeshBasicMaterial({ color: 0x76e0d0, transparent: true, opacity: 0.35 }),
  )
  meridian.rotation.y = Math.PI / 2
  globe.add(meridian)

  props.projects.forEach((project, index) => addProjectMarker(project, index, props.projects.length))

  starField = createStarField()
  scene.add(starField)

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setClearColor(0x000000, 0)
  host.appendChild(renderer.domElement)
  timer.connect(document)

  resizeObserver = new ResizeObserver(resizeScene)
  resizeObserver.observe(host)
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionHandler = handleMotionPreference
  pointerHandler = handlePointerMove
  pointerLeaveHandler = handlePointerLeave
  clickHandler = handleSceneClick
  reducedMotion.addEventListener('change', motionHandler)
  host.addEventListener('pointermove', pointerHandler, { passive: true })
  host.addEventListener('pointerleave', pointerLeaveHandler)
  host.addEventListener('click', clickHandler)
  resizeScene()
  if (!reducedMotion.matches) animate()
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrame)
  resizeObserver?.disconnect()
  reducedMotion?.removeEventListener('change', motionHandler)
  sceneHost.value?.removeEventListener('pointermove', pointerHandler)
  sceneHost.value?.removeEventListener('pointerleave', pointerLeaveHandler)
  sceneHost.value?.removeEventListener('click', clickHandler)
  timer.dispose()
  scene?.traverse((object) => {
    object.geometry?.dispose()
    if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
    else object.material?.dispose()
  })
  renderer?.dispose()
  renderer?.domElement.remove()
})
</script>

<template>
  <div ref="sceneHost" class="projects-scene" aria-hidden="true"></div>
  <nav class="project-orbit-selector" aria-label="Choose a project on the globe">
    <button
      v-for="(project, index) in projects"
      :key="project.title"
      type="button"
      :aria-pressed="selectedIndex === index"
      :style="{ '--project-color': projectColors[index % projectColors.length] }"
      @click="selectProject(index)"
    >
      <span class="orbit-index">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="orbit-title">{{ project.title }}</span>
    </button>
  </nav>
</template>

<style scoped>
.projects-scene {
  width: 100%;
  height: clamp(290px, 32vw, 410px);
  margin: -22px 0 0;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 52%, rgba(255, 60, 121, 0.13), transparent 40%),
    radial-gradient(ellipse at 76% 52%, rgba(118, 224, 208, 0.08), transparent 36%);
}

.projects-scene :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.project-orbit-selector {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
  max-width: 900px;
  margin: -4px auto 34px;
}

.project-orbit-selector button {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  min-height: 42px;
  padding: 7px 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  color: #d5d1d8;
  background: rgba(21, 21, 21, 0.68);
  cursor: pointer;
  font: inherit;
  font-size: 11px;
  line-height: 1.35;
  text-align: left;
  transition: border-color 150ms ease, background 150ms ease, color 150ms ease;
}

.project-orbit-selector button:hover,
.project-orbit-selector button:focus-visible,
.project-orbit-selector button[aria-pressed='true'] {
  border-color: var(--project-color);
  color: #fff;
  background: color-mix(in srgb, var(--project-color) 10%, #151515);
}

.orbit-index {
  flex: 0 0 auto;
  color: var(--project-color);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
}

.orbit-title {
  min-width: 0;
  overflow-wrap: anywhere;
}

@media (max-width: 600px) {
  .projects-scene {
    height: 270px;
    margin: -28px 0 0;
  }

  .project-orbit-selector {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
    margin-bottom: 26px;
  }

  .project-orbit-selector button {
    min-height: 44px;
    padding: 6px 8px;
    font-size: 10px;
  }
}

</style>