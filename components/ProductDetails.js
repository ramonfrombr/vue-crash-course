app.component('product-details', {

    props: {
        description: String,
        details: Array
    },

    template:

    /*html*/
    `<div>
        <p>{{ description }}</p>

        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    </div>`
})