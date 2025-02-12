<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Get and validate email
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    if (!$email) {
        throw new Exception('Please enter a valid email address');
    }

    // Here you would typically:
    // 1. Check if email already exists
    // 2. Add to database
    // 3. Send confirmation email
    // For now, we'll simulate success:
    
    // Simulate database operation
    $success = true; // Replace with actual DB operation

    if (!$success) {
        throw new Exception('Failed to save subscription');
    }

    echo json_encode([
        'success' => true,
        'message' => 'Thank you for subscribing!'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
