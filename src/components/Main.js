import React from 'react'

export default function Main() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main className='main'>
            <div className='generator-about'>
                <h2 className='about-head'>What is it for?</h2>
                <p className='about-text'>This a cool free app to make memes online.
                    Click to get a random meme image,
                    enter top and bottom textes and have pure fun! :)</p>
            </div>
            <div className='generator'>
                <div className='form'>
                    <input
                        type="text"
                        placeholder='Top text'
                        className='form--input'
                        name='topText'
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder='Bottom text'
                        className='form--input'
                        name='bottomText'
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                    <button
                        className='form--button'
                        onClick={getMemeImage}
                    >Get a new meme image  🖼</button>
                </div>
                <div className="meme">
                    <img src={meme.randomImage} className="meme--image" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </div>
        </main>
    )
}
