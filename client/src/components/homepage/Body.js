import React from "react";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="main my-5">
      <section id="services" className="my-5">
        <div className="container">
          <h2 className="text-center mb-5">Nos services</h2>
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2019/08/20/10/14/moss-4418351__340.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2020/02/04/09/50/the-alps-4817766__340.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2020/02/03/17/39/beach-4816249__340.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="cta-post-article" className="bg-primary p-5">
        <div className="container">
          <h2 className="text-center text-white">
            Vous souhaitez poster un article ? Nous vous donnons la possibilité
            de vous exprimer...
          </h2>
          <p className="text-white text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minus
            expedita quaerat laudantium quasi cum blanditiis molestiae
            exercitationem excepturi cumque.
          </p>
          <div className="text-center mt-5">
            <Link to="#" className="btn btn-success">
              Poster un article !
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
