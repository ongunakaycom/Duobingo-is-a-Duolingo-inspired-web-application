<template> 
  <footer class="footer mt-auto py-4" style="background-color: #58cc02;">
    <div class="container-fluid d-flex justify-content-center">
      <div class="footer-container text-white py-4 px-3">
        
        <div class="footer-section">
          <h5 class="fw-bold">About Us</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white text-decoration-none">Courses</a></li>
            <li><a href="#" class="text-white text-decoration-none">Mission</a></li>
            <li><a href="#" class="text-white text-decoration-none">Approach</a></li>
            <li><a href="#" class="text-white text-decoration-none">Efficacy</a></li>
            <li><a href="#" class="text-white text-decoration-none">Handbook</a></li>
            <li><a href="#" class="text-white text-decoration-none">Research</a></li>
            <li><a href="#" class="text-white text-decoration-none">Careers</a></li>
            <li><a href="#" class="text-white text-decoration-none">Store</a></li>
            <li><a href="#" class="text-white text-decoration-none">Investors</a></li>
            <li><a href="#" class="text-white text-decoration-none">Contact Us</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h5 class="fw-bold">Products</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white text-decoration-none">Lingo</a></li>
            <li><a href="#" class="text-white text-decoration-none">Lingo for Schools</a></li>
            <li><a href="#" class="text-white text-decoration-none">Lingo English Test</a></li>
            <li><a href="#" class="text-white text-decoration-none">Lingo Math</a></li>
            <li><a href="#" class="text-white text-decoration-none">Podcast</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h5 class="fw-bold">Apps</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white text-decoration-none">Android</a></li>
            <li><a href="#" class="text-white text-decoration-none">iOS</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h5 class="fw-bold">Help & Support</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white text-decoration-none">FAQs</a></li>
            <li><a href="#" class="text-white text-decoration-none">Schools FAQs</a></li>
            <li><a href="#" class="text-white text-decoration-none">Test FAQs</a></li>
            <li><a href="#" class="text-white text-decoration-none">Status</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h5 class="fw-bold">Privacy & Terms</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white text-decoration-none">Community Guidelines</a></li>
            <li><a href="#" class="text-white text-decoration-none">Terms</a></li>
            <li><a href="#" class="text-white text-decoration-none">Privacy</a></li>
          </ul>

          <h5 class="fw-bold mt-3">Follow Us</h5>
          <ul class="list-unstyled d-flex gap-3 justify-content-center">
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
.footer-container {
  max-width: 1024px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 16px;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .footer-section {
    width: 100%;
    text-align: center;
  }
}
</style>
