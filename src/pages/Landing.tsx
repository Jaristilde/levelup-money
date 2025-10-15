<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Level Up Money - Escape the Paycheck-to-Paycheck Cycle</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Arial", sans-serif;
    }

    body {
      overflow-x: hidden;
      background-color: #0b132b;
    }

    /* Header */
    header {
      width: 100%;
      background-color: #0b132b;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 60px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
    }

    header h1 {
      font-size: 1.6rem;
      font-weight: 800;
    }

    nav a {
      color: white;
      margin-left: 30px;
      text-decoration: none;
      font-weight: 500;
    }

    .btn-header {
      background-color: #baff29;
      color: #000;
      padding: 10px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    .btn-header:hover {
      background-color: #a6f122;
    }

    /* Hero Section */
    .hero {
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      background: url('A_2D_digital_illustration_homepage_design_of_Level.png') center/cover no-repeat;
      padding: 150px 80px 100px;
      color: white;
      position: relative;
      margin-top: 80px;
    }

    .hero h2 {
      font-size: 2.8rem;
      font-weight: 800;
      max-width: 700px;
      line-height: 1.3;
      color: #ffffff;
      text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    }

    .hero p {
      font-size: 1.2rem;
      margin-top: 15px;
      color: #e5e5e5;
    }

    .btn-main {
      background-color: #baff29;
      color: #000;
      padding: 15px 30px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: bold;
      text-decoration: none;
      margin-top: 30px;
      transition: background-color 0.3s ease;
    }

    .btn-main:hover {
      background-color: #a6f122;
    }

    .hero .subtext {
      font-size: 1.1rem;
      color: #ffffff;
      margin-top: 50px;
      text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    }

    /* Footer */
    footer {
      text-align: center;
      background-color: #0b132b;
      color: white;
      padding: 20px 10px;
      font-size: 0.9rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      header {
        padding: 15px 25px;
      }

      .hero {
        align-items: center;
        text-align: center;
        padding: 100px 20px;
      }

      .hero h2 {
        font-size: 2rem;
      }

      .hero p {
        font-size: 1rem;
      }

      .btn-main {
        font-size: 0.95rem;
        padding: 12px 25px;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Level Up Money</h1>
    <nav>
      <a href="#">Why Choose Level Up</a>
      <a href="#" class="btn-header">Start Your Free Trial</a>
    </nav>
  </header>

  <section class="hero">
    <h2>Step-by-step milestones to escape the paycheck-to-paycheck cycle.</h2>
    <p><em>Get off the rat race</em></p>
    <a href="#" class="btn-main">Start Your Free Trial</a>
    <p class="subtext">Deja de vivir de sueldo a sueldo</p>
  </section>

  <footer>
    <p>&copy; 2025 Level Up Money. All rights reserved.</p>
  </footer>
</body>
</html>
