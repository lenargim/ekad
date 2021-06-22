<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CatalogLandDetailedController extends AbstractController
{
  /**
   * @Route("/catalog/land/detailed")
   */
  public function catalogLandDetailed(): Response
  {
    return $this->render('catalog-land-detailed.html.twig', []);
  }
}