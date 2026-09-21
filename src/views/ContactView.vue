<template>
  <main class="page-content"><section class="contact-section"><h1>Contact Me</h1>
    <form action="https://formspree.io/f/mbdbwykj" method="POST" class="contact-form">
      <div class="form-group"><label for="name">Full Name</label><input id="name" type="text" name="name" placeholder="Enter your name" required /></div>
      <div class="form-group"><label for="email">Email</label><input id="email" type="email" name="email" placeholder="Enter your email" required /></div>
      <div class="form-group"><label for="message">Message</label><textarea id="message" name="message" rows="6" placeholder="Write your message" required></textarea></div>
      <button type="submit" class="btn primary-btn">Send Message</button>
    </form>
  </section></main>
</template>
