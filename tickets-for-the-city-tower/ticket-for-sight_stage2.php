{# templates/user/notifications.html.twig #}
<link href="{{ asset('css/style.css') }}" rel="stylesheet"/>

<div class="header">
    <h2>City Tower Leipzig</h2>
</div>

<div class="content">

    {% if message is defined and status is defined %}
        <div class="message {{ status }}"> {{ message }} </div>
    {% endif %}

    <h3> Your Order <i class="order_id">#{{order_id}}</i></h3>


    <table class="tickets">
        <thead>
            <tr>
                <th>Ticket ID</th>
                <th>Price Category</th>
                <th>Price</th>
                <th>Date</th>
                <th>Remove</th>
            </tr>
        </thead>

        <tbody>
        {% if tickets is defined and tickets %}
            {% for ticket in tickets %}

                <tr>
                    <td>{{ ticket.id|e }}</td>
                    <td>{{ ticket.category|e }} </td>
                    <td>{{ ticket.price|e }} </td>
                    <td>{{ ticket.date|e }} </td>
                    <td><a href="{{ ticket.url|e }}" aria-label="Remove Ticket with Id {{ ticket.id|e }}">-</a></td> 
                </tr>

            {% endfor %}
        {% endif %}
        </tbody>

    </table>

</div>