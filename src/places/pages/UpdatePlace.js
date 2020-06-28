import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

import './PlaceForm.css';


const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1024px-Image_created_with_a_mobile_phone.png',
        address: 'Chinar Royal Complex, E 1/136, Arera Colony',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://cdn.hasselblad.com/hasselblad-com/6cb604081ef3086569319ddb5adcae66298a28c5_x1d-ii-sample-01-web.jpg?auto=format&q=97',
        address: 'Chinar Royal Complex, E 1/136, Arera Colony',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;


    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        if (identifiedPlace) {

            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
      
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true
            );
            setIsLoading(false);
        }
       

    }, [setFormData, identifiedPlace]);
     

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }
  

    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card>
        <h2>Could not find place!</h2>
        </Card>
        </div>

        );
    }

    if(isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler} > 
      <Input 
      id="title" 
      element="input" 
      type="text" 
      label="Title" 
      validators={[VALIDATOR_REQUIRE()]}  
      errorText="please enter a valid title."
      onInput={inputHandler}
      initialValue={formState.inputs.title.value}
      initialValid={formState.inputs.title.isValid}
      />

<Input 
      id="description" 
      element="textarea" 
      label="Description" 
      validators={[VALIDATOR_MINLENGTH(5)]}  
      errorText="please enter a valid desription (mim length 5)."
      onInput={inputHandler}
      initialValue={formState.inputs.description.value}
      initialValid={formState.inputs.description.isValid}
      />

      <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
      </Button>
    </form>
    );
        
};

export default UpdatePlace;