const form = document.querySelector('.quiz-form')
const correctAnswers = ['B', 'B', 'B', 'B']
const finalResult = document.querySelector('.final-score-container')
const scoreResult = document.querySelector('span')

let score = 0

const getUserAnswers = () => {
    let userAnswers = []

    correctAnswers.forEach((_, index) => {
        const userAnswer = form[`inputQuestion${index+1}`].value
        userAnswers.push(userAnswer)
    })

    return userAnswers
}

const calculateScore = userAnswers => {

    userAnswers.forEach((userAnswers, index) => {
        const isUserAnswerCorrect = userAnswers === correctAnswers[index]
        const divParentInputAnswers = form[`inputQuestion${index+1}`][index].parentElement.parentElement.parentElement
        if (isUserAnswerCorrect) {
            divParentInputAnswers.classList.remove('border-red')
            divParentInputAnswers.classList.add('border-green')
            score += 25
        } else {
            divParentInputAnswers.classList.remove('border-green')
            divParentInputAnswers.classList.add('border-red')
        }

    })
}

const animateScore = () => {
    let count = 0

    const timer = setInterval(() => {

        if (count === score) {
            clearInterval(timer)
            score = 0
            return
        }

        scoreResult.textContent = `${++count}%`

    }, 10)

}

const showScore = () => {
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
    finalResult.classList.remove('d-none')
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const userAnswer = getUserAnswers()
    calculateScore(userAnswer)
    animateScore()
    showScore()
})