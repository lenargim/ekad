<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CatalogStoreController extends AbstractController
{
  /**
   * @Route("/catalog/store")
   */
  public function catalogStore(): Response
  {
    return $this->render('catalog-store.html.twig', []);
  }
}