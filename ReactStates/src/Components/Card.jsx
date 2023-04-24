const Card = ({name, age, author}) => {
    return (
        <div>
        <p>Author: {author}</p>
        <p>My name is {name}</p>
        <p>I am {age} years old</p>
        </div>
    )
}

export default Card;