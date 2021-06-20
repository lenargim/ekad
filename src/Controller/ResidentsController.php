<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ResidentsController extends AbstractController
{
  /**
   * @Route("about/residents")
   */
  public function residents(): Response
  {
    return $this->render('residents.html.twig', []);
  }
}