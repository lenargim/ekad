<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TeamController extends AbstractController
{
  /**
   * @Route("/team")
   */
  public function team(): Response
  {
    return $this->render('team.html.twig', []);
  }
}