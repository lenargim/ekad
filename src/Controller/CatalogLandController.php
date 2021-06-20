<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CatalogLandController extends AbstractController
{
  /**
   * @Route("/catalog/land")
   */
  public function catalogLand(): Response
  {
    return $this->render('catalog-land.html.twig', []);
  }
}