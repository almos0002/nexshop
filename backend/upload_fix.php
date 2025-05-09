<?php
// Set custom upload temporary directory
ini_set('upload_tmp_dir', __DIR__ . '/storage/app/tmp');
// Verify the setting was applied
echo "Temporary upload directory set to: " . ini_get('upload_tmp_dir');
