import {ref, computed} from "vue"

export const stacks = ref([])
export const cards = ref([
    {
        id: 1,
        front: "What is the capital of France?",
        back: "Paris",
    },
    {
        id: 2,
        front: "What is the capital of Germany?",
        back: "Berlin",
    },
    {
        id: 3,
        front: "What is the capital of Italy?",
        back: "Rome",
    },
])

export const current_stack_id = ref(0)
export const current_stack_index = ref(0)
export const current_card_id = ref(1)
export const editStackName = ref('')
export const createStackDescription = ref('')
export const editStackDescription = ref('')
