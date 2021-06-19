<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContactsController extends AbstractController
{
  /**
   * @Route("/contacts")
   */
  public function contacts(): Response
  {
    return $this->render('contacts.html.twig', []);
  }
}