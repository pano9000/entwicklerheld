<?php

namespace App\Controller;

use App\Entity\TicketCategory;
use App\Entity\Ticket;
use App\Entity\User;
use App\Entity\Orders;
use App\Repository\TicketCategoryRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;

class TicketController extends AbstractController
{
    /**
    * @Route("/order/add/", methods={"POST"}, name="order_add")
    */
    public function orderAdd(Request $request): Response
    {

        $reqUsername = $request->get("username");

        // according to Entity username might be up to 255 characters long, without any constraints...
        if (!$reqUsername || \preg_match("/^.{1,255}$/", $reqUsername) != 1) {
            throw new BadRequestHttpException("Properties 'username' needs to be a valid user.");
        }

        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->findOneBy(["name" => $reqUsername]);
        
        if ($user == null) {
            throw $this->createNotFoundException('The username does not exist');
        }

        $order = new Orders();
        
        $order
            ->setPrice(0)
            ->setShipping(false)
            ->setUser($user)
            ->setDate(new \DateTime())
        ;

        $entityManager->persist($order);
        $entityManager->flush();

        return $this->render(
            "overview_s.html.twig", 
            $this->getTicketControllerResponseRenderData(
                $order->getId(), 
                "New Order created",
                "success",
                []
                // not sure how much sense the "tickets" property makes, as a new order will never have tickets added to it, 
                // due to the way this app is built, where the tickets are added in a second POST request to the order (which is actually quite weird) 
            )
        );
        
    }

    /**
    * @Route("/order/{order_id}/ticket/add/", methods={"POST"}, name="order_ticket_add")
    */
    public function orderAddTicket(Request $request): Response 
    {
        // in production the validation steps below should likely be handled by some validator

        // according to Orders entity the id column is of type integer 
        if (\preg_match("/^\\d+$/", $request->get("order_id")) != 1) {
            throw new BadRequestHttpException("Invalid order_id in path.");
        }

        if (!$request->get("category") || !$request->get("date")) {
            throw new BadRequestHttpException("Properties 'category' and 'date' need to be present.");
        }

        $reqDate = \DateTime::createFromFormat("d.m.Y", $request->get("date"));

        if ($reqDate == false) {
            throw new BadRequestHttpException("Property 'date' needs to be a valid date in the form 'dd.mm.YYYY'.");
        }

        $entityManager = $this->getDoctrine()->getManager();

        $ticketCategory = $entityManager->getRepository(TicketCategory::class)->findOneBy(["name" => $request->get("category")]);
        if ($ticketCategory == null) {
            // tests want me to throw a 404 here, I feel like a "BadRequest" like below, would be more appropriate here
            throw $this->createNotFoundException("Property 'category' must be a valid ticket category");
        }

        $order = $entityManager->getRepository(Orders::class)->find($request->get("order_id"));
        if ($order == null) {
            throw $this->createNotFoundException("The order does not exist");
        }

        $ticket = new Ticket();
        $ticket
            ->setValidDate($reqDate)
            ->setOrderId($order)
            ->setCategory($ticketCategory)
        ;

        $entityManager->persist($ticket);
        $entityManager->flush();

        $tickets = $order->getTickets();
        $ticketId = $ticket->getId();

        $ticketsResponse = array();
        foreach ($tickets as $ticket) {
            \array_push($ticketsResponse, [
                    "id" => $ticketId,
                    "category" => $ticket->getCategory()->getName(),
                    "price" => $ticket->getCategory()->getPrice(),
                    "date" => $ticket->getValidDate()->format("d.m.Y"),
                    "url" => "order/{$order->getId()}/ticket/remove?id={$ticketId}" 
                ]
            );
        }
    
        return $this->render(
            "overview_s.html.twig",
            $this->getTicketControllerResponseRenderData(
                $order->getId(), 
                "#$ticketId was added to your order.",
                "success",
                $ticketsResponse
            )
        );

    }

    private function getTicketControllerResponseRenderData($orderId, $message, $status, $tickets): array {
        return [
            "order_id" => $orderId,
            "message" => $message,
            "status" => $status,
            "tickets" => $tickets
        ];
    }
}
