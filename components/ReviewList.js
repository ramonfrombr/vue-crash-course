app.component('review-list', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },

    template:
    /*html*/
    `<div className="review-container">
        <h3>Reviews:</h3>

        <ul>
            <li v-for="(review, index) in reviews" :key="index">
                {{ review.name }} game this {{ review.rating }} stars

                <br />

                "{{ review.review }}"
            </li>
        </ul>
    </div>`
})