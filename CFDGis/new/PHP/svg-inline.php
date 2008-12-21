<?php
  header('Content-Type: image/svg+xml');
  echo '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';
?>
<svg width="32px" height="32px" viewBox="0 0 100 100" version="1.0" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="lightgray" />
  <g stroke="red">
    <line x1="10" y1="10" x2="80" y2="80" stroke-width="10" />
    <line x1="10" y1="80" x2="80" y2="10" stroke-width="10" />
  </g>
</svg>
