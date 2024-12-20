<template>
  <footer class="footer bg-light py-4">
    <div class="container">
      <!-- Footer content -->
      <div class="row">
        <div class="col-md-6">
          <p>&copy; 2024 Duolingo Clone. All rights reserved.</p>
        </div>
        <div class="col-md-6 text-md-end">
          <!-- Social Media Links -->
          <ul class="list-unstyled d-flex">
            <li><a href="#" class="me-3">Facebook</a></li>
            <li><a href="#" class="me-3">Twitter</a></li>
            <li><a href="#" class="me-3">Instagram</a></li>
            <li><a href="#" class="me-3">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  color: #6c757d;
  font-size: 14px;
}

.footer a {
  color: #007bff;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

.footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer .list-unstyled {
  list-style-type: none;
  padding: 0;
}

.footer .list-unstyled li {
  display: inline;
  margin-right: 15px;
}
</style>
