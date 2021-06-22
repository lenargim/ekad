<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class Error404Controller extends AbstractController
{
  /**
   * @Route("/404")
   */
  public function Error404(): Response
  {
    return $this->render('404.html.twig', []);
  }
}