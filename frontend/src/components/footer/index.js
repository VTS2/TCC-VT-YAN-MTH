import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="bg-dark text-center text-white">

      <div className="container p-4">

        <section className="mb-4">

          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-facebook-f"></i>
          </a>


          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-twitter"></i>
          </a>


          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-google"></i>
          </a>


          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-instagram"></i>
          </a>


          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-linkedin-in"></i>
          </a>


          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
            <i className="fab fa-github"></i>
          </a>
        </section>

        <section className="">
          <form action="">

            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Assine a nossa newsletter</strong>
                </p>
              </div>

              <div className="col-md-5 col-12">

                <div className="form-outline form-white mb-4">
                  <input type="email" id="form5Example21" className="form-control" />
                  <label className="form-label" for="form5Example21">Endereço de email</label>
                </div>
              </div>

              <div className="col-auto">

                <button type="submit" className="btn btn-outline-light mb-4">
                Se inscreva
                </button>
              </div>
            </div>

          </form>
        </section>



        <section className="mb-4">
          <p>
          Nossa equipe é composta por profissionais apaixonados e 
          altamente qualificados que compartilham o compromisso de 
          criar um impacto positivo por meio da tecnologia. Trabalhamos 
          juntos para transformar suas vontade de adquirir uma arma em realidade.
          </p>
        </section>

        <section className="">

          <div className="row">

          </div>

        </section>

      </div>

      <div className="text-center p-3" style={{ background: ' rgba(0, 0, 0, 0.2);' }}>
        © 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
      </div>
    </footer>

  );
}

export default Footer;