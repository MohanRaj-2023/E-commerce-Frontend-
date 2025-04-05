import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router'



const Categorie = ({categorie}) => {
  console.log("CAtegorey_Name:",categorie.name)
  const backendBaseURL = import.meta.env.VITE_API_BASE_URL;
  return (
    <Card className='my-3 p-3 rounded' >
        <Link to={`/categorie/${categorie.name}`} >
         <Card.Img src={`${backendBaseURL}${categorie.image}`} alt='image' className='img-fluid' 
         style={{
          height:"200px",
          width:"100%",
          objectFit:"cover",
          borderRadius:"10px"
         }} ></Card.Img>
        </Link>
        <Card.Body>
            <Link to="/" as='h3' className='text-dark text-decoration-none' >
             <Card.Title>{categorie.name}</Card.Title> 
            </Link>
             <Card.Text>
              {categorie.productinfo}
             </Card.Text>

        </Card.Body>
    </Card>
  )
}

export default Categorie