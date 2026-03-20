<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class EducationController extends AbstractController
{
    #[Route('/formation', name: 'app_education')]
    public function index(): Response
    {
        return $this->render('education/index.html.twig');
    }
}
