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
        $this->entityManager    = $entityManager;
        $this->personRepository = $personRepository;
    }

    /**
     * @Route("/create", name="api_person_create")
     * @param Request $request
     * @author SanderCokartSchool
     */
    public function create(Request $request)
    {

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
     * @author Sander Cokart
     */
    public function delete(Person $person)
    {
        $this->entityManager->remove($person);
        $this->entityManager->flush();
    }
}
