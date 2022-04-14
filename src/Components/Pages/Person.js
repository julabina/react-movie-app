import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Person = () => {

    const params = useParams();
    const [personData, setPersonData] = useState({});
    
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/person/' + params.id + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let role = '';
            if(data.known_for_department === "Acting") {
                if (data.gender === 1) {
                    role = "Actrice";
                } else if (data.gender === 2) {
                    role = "Acteur";
                } 
            } else {
                role = data.known_for_department;   
            }
            let item = {
                names : data.name,
                birthday: data.birthday,
                deathday: data.deathday,
                bio: data.biography,
                gender: data.gender,
                placeOfBirth: data.place_of_birth,
                profile: "https://image.tmdb.org/t/p/w200" + data.profile_path,
                role: role
            }
            setPersonData(item);
        })
    },[]);

    return (
        <main className='person'>
            <section className='person_top'>
                <img className='person_top_profile' src={personData.profile} alt="" />
                <div className="person_top_infos">
                    <h2>{personData.names}</h2>
                    <div className="person_top_infos_bot">
                        <div className="person_top_infos_bot_left">
                            <p>{personData.gender === 1 ? "née le " : "né le "}{personData.birthday} à {personData.placeOfBirth}</p>
                            {personData.deathday !== null && "Décédé(e) le " + personData.deathday}
                        </div>
                        {personData.role}
                    </div>
                </div>
            </section>
            <section className="person_bio">
                {personData.bio}
            </section>
        </main>
    );
};

export default Person;