import React, { useState } from 'react';

const Contact = () => {

    const [inputFirstname, setInputFirstname] = useState("");
    const [inputLastname, setInputLastname] = useState("");
    const [inputMail, setInputMail] = useState("");
    const [inputTopic, setInputTopic] = useState("");
    const [inputMessage, setInputMessage] = useState("");

    const [msgToSend, setMsgToSend] = useState([]);


    const sendMessage = (e) => {
        e.preventDefault();
        let arr = [];
        arr.push(inputFirstname, inputLastname, inputMail, inputTopic, inputMessage);
        setMsgToSend(arr);
        setInputFirstname("");
        setInputLastname("");
        setInputMail("");
        setInputTopic("");
        setInputMessage("");
    }

    return (
        <main>
            <section className="contactCont">
                <h2 className='contact_title'>Contact</h2>
                <form className='contact' onSubmit={sendMessage}>
                    <div className="contact_names">
                        <input className='contact_names_input' type="text" name="firstname" id="contactFirst" placeholder='Prénom' required autoComplete='off' value={inputFirstname} onChange={(e) => setInputFirstname(e.target.value)} />
                        <input className='contact_names_input' type="text" name="lastname" id="contactLast" placeholder='Nom' required autoComplete='off' value={inputLastname} onChange={(e) => setInputLastname(e.target.value)} />
                    </div>
                    <input className='contact_email' type="email" name="email" id="contactMail" placeholder='Mail' required autoComplete='off' value={inputMail} onChange={(e) => setInputMail(e.target.value)} />
                    <div className="contact_separator"></div>
                    <div className="contact_message">
                        <input className='contact_message_topic' type="text" name="topic" id="contactTopic" placeholder='Sujet' autoComplete='off' value={inputTopic} onChange={(e) => setInputTopic(e.target.value)} />
                        <textarea className='contact_message_txt' name="message" id="contactMsg" cols="30" rows="10" placeholder='Votre message' required  autoComplete='off' value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}></textarea>
                        <button className='contact_message_btn' type="submit">Envoyer</button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Contact;