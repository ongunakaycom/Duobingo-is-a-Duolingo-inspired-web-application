<template>
  <footer class="footer mt-auto py-4" style="background-color: #58cc02;">
    <div class="container"> <!-- Added container to align with other sections -->
      <div class="row">
        
        <div class="col-md-3 col-sm-6 footer-section">
          <h5 class="fw-bold">About Us</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white text-decoration-none">Courses</a></li>
            <li><a href="#" class="text-white text-decoration-none">Mission</a></li>
            <li><a href="#" class="text-white text-decoration-none">Approach</a></li>
            <li><a href="#" class="text-white text-decoration-none">Careers</a></li>
          </ul>
        </div>

        <div class="col-md-3 col-sm-6 footer-section">
          <h5 class="fw-bold">Products</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white text-decoration-none">Lingo</a></li>
            <li><a href="#" class="text-white text-decoration-none">Lingo Math</a></li>
            <li><a href="#" class="text-white text-decoration-none">Podcast</a></li>
          </ul>
        </div>

        <div class="col-md-3 col-sm-6 footer-section">
          <h5 class="fw-bold">Help & Support</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white text-decoration-none">FAQs</a></li>
            <li><a href="#" class="text-white text-decoration-none">Test FAQs</a></li>
            <li><a href="#" class="text-white text-decoration-none">Status</a></li>
          </ul>
        </div>

        <div class="col-md-3 col-sm-6 footer-section">
          <h5 class="fw-bold">Follow Us</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white text-decoration-none">Instagram</a></li>
            <li><a href="#" class="text-white text-decoration-none">TikTok</a></li>
            <li><a href="#" class="text-white text-decoration-none">Twitter</a></li>
            <li><a href="#" class="text-white text-decoration-none">YouTube</a></li>
          </ul>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
.footer-section {
  margin-bottom: 20px;
}

/* Mobile: Center align text */
@media (max-width: 768px) {
  .footer-section {
    text-align: center;
  }
}
</style>
