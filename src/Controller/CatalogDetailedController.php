<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CatalogDetailedController extends AbstractController
{
  /**
   * @Route("/catalog/detailed")
   */
  public function catalogDetailed(): Response
  {
    return $this->render('catalog-detailed.html.twig', []);
  }
}