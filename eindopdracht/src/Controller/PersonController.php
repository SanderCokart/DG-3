<?php

namespace App\Controller;

use App\Entity\Person;
use App\Repository\PersonRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/person", name="api_person")
 */
class PersonController extends AbstractController
{
    /**
     * Entity manager
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * Repository navigator
     * @var PersonRepository
     */
    private $personRepository;

    /**
     * PersonController constructor.
     * @param EntityManagerInterface $entityManager
     * @param PersonRepository $personRepository
     */
    public function __construct(EntityManagerInterface $entityManager, PersonRepository $personRepository)
    {
        $this->entityManager = $entityManager;
        $this->personRepository = $personRepository;
    }

    /**
     * @Route("/create", name="api_person_create")
     * @param Request $request
     * @return JsonResponse
     * @author SanderCokartSchool
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $fName = isset($content->fName) ? htmlspecialchars($content->fName) : 'N/A';
        $lName = isset($content->lName) ? htmlspecialchars($content->lName) : 'N/A';
        $age = isset($content->age) ? htmlspecialchars($content->age) : "N/A";

        $person = new Person();

        $person->setFName($fName);
        $person->setLName($lName);
        $person->setAge($age);

        $this->entityManager->persist($person);
        $this->entityManager->flush();

        return $this->json([
            'person' => $person,
        ]);
    }

    /**
     * @Route("/read", name="api_person_read")
     * @author SanderCokartSchool
     */
    public function read()
    {

    }

    /**
     * @Route("/update/{id}", name="api_person_update")
     * @param Request $request
     * @param Person $person
     * @author Sander Cokart
     */
    public function update(Request $request, Person $person)
    {

    }

    /**
     * @Route("/delete/{id}", name="api_person_delete")
     * @param Person $person
     * @author Sander Cokart
     */
    public function delete(Person $person)
    {

    }
}
