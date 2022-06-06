app.component('product-display', {

    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: 
    /*html*/
    `<div class="product-display">
        <div class="product-container">
        
            <div class="product-image">
                <img
                    v-show="showImage"
                    :src="image"
                    alt=""
                >
            </div>

            <div class="product-info">
                <h1 :style="styles">{{ title }}</h1>

                <product-details
                    :description="description"
                    :details="details"
                />


                <p v-if="inStock > 10">In Stock</p>
                <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
                <p v-else>Out of Stock</p>

                <p v-if="onSale">On Sale!!!</p>

                <p>Shipping: {{ shipping }}</p>

                <div
                    v-for="(variant, index) in variants"
                    :key="variant.id"
                    @mouseover="updateVariant(index)"
                    class="color-circle"
                    :style="{ backgroundColor: variant.color }"
                ></div>

                <div v-for="size in sizes">{{ size }}</div>

                <a :href="url">Google</a>

                <button
                    class="button"
                    :class="{ disabledButton: !inStock }"
                    :disabled="!inStock"
                    v-on:click="addToCart"
                >Add to Cart</button>

                <button
                    class="button"
                    :class="{ disabledButton: cart == 0 }"
                    :disabled="cart == 0 ? true : false"
                    v-on:click="removeFromCart"
                >Remove from Cart</button>
            </div>
        </div>

        <review-list v-if="reviews.length" :reviews="reviews"></review-list>

        <review-form
            @review-submitted="addReview"
        />
    </div>`,

    data() {
        return {
            styles: {
                color: 'green',
                fontSize: '40px',
            },
            product: 'Socks',
            brand: 'Vue Mastery',
            description: 'Supposed to be used with shoes.',
            selectedVariant: 0,
            url: 'https://www.google.com',
            showImage: true,
            onSale: true,
            inventory: 8,
            details: [
                '50% cotton',
                '30% wool',
                '20% polyester'
            ],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 20 }
            ],
            sizes: [
                'Small',
                'Medium',
                'Large'
            ],
            reviews: [],
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity;
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            }
            return 2.99;
        }
    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        addReview(review) {
            this.reviews.push(review);
        }
    }
})