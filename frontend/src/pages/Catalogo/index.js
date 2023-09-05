import React from 'react';
import catalogoo from '../../assets/img/catalogoo.jpeg';
import arma1 from '../../assets/img/Bersa22.webp';
import arma2 from '../../assets/img/glockG4.webp';
import arma3 from '../../assets/img/tx22.jpg';
import arma4 from '../../assets/img/berreta.jpg';
import SearchBar from '../../components/SearchBar';
import './Catalogo.css';

function Catalogo() {
	return (
		<section>
			<img src={catalogoo} className="bannerCat" alt="..." />
			<section className="container">
				<div className="container">
					<h3 className="title">
						<h1>Produtos</h1>
					</h3>
					<form class="d-flex form-inline" role="search" className='filtroo'>
            {/* <input class="form-control me-2 " type="SearchBar" placeholder="Pesquisar" aria-label="Search" />
            <button class="btn btn-outline-danger" type="submit">Buscar</button> */}
            <SearchBar/>
          </form>
					<div className="products-container">
						{/* Lista de produtos */}
						<div className="card">
							<img className="card-image img" src={arma1} alt="" />
							<h3 className="card-title">bersa</h3>
							<div className="price">$200.00</div>
							<a href="/bersa" className="card-button">
								Saiba Mais
							</a>
						</div>
						<div className="card">
							<img className="card-image img" src={arma2} alt="" />
							<h3 className="card-title">glock</h3>
							<div className="price">$200.00</div>
							<a href="#" className="card-button">
								Saiba Mais
							</a>
						</div>
						<div className="card">
							<img className="card-image img" src={arma3} alt="" />
							<h3 className="card-title">Tx22</h3>
							<div className="price">$200.00</div>
							<a href="#" className="card-button">
								Saiba Mais
							</a>
						</div>
						<div className="card">
							<img className="card-image img" src={arma4} alt="" />
							<h3 className="card-title">berreta</h3>
							<div className="price">$200.00</div>
							<a href="#" className="card-button">
								Saiba Mais
							</a>
						</div>
						{/* Adicione mais produtos aqui conforme necessário */}
					</div>
				</div>
			</section>
		</section>
	);
}

export default Catalogo;
