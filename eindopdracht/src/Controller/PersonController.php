<?php

namespace App\Controller;

use App\Entity\Person;
use App\Repository\PersonRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
        $this->entityManager    = $entityManager;
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
        $people = $this->personRepository->findAll();

        $arrayOfPeople = [];
        foreach ($people as $person) {
            $arrayOfPeople[] = $person->toArray();
        }
        return $this->json($arrayOfPeople);
    }

    /**
     * @Route("/update/{id}", name="api_person_update")
     * @param Request $request
     * @param Person $person
     * @return JsonResponse
     * @author Sander Cokart
     */
    public function update(Request $request, Person $person)
    {
        $content = json_decode($request->getContent());

        $oldFName = $person->getFName();
        $oldLName = $person->getLName();
        $oldAge   = $person->getAge();

        $newFName = isset($content->fName) ? $content->fName : $oldFName;
        $newLName = isset($content->lName) ? $content->lName : $oldLName;
        $newAge   = isset($content->age) ? $content->age : $oldAge;

        $person->setFName($newFName);
        $person->setLName($newLName);
        $person->setAge($newAge);

        $this->entityManager->flush();

        return $this->json([
            'person' => $person->toArray(),
        ]);


    }

    /**
     * @Route("/delete/{id}", name="api_person_delete")
     * @param Person $person
     * @return Response
     * @author Sander Cokart
     */
    public function delete(Person $person)
    {
        $this->entityManager->remove($person);
        $this->entityManager->flush();
        return new Response();
    }
}
