import React from 'react'
import { Link } from 'react-router-dom'

const PublicFooter = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", margin: "3rem" }}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{display: "flex"}}>
                <div className="column">
                    <a><h1 to="/" style={{textDecoration: "none", color: "black", cursor: "pointer"}}>GOODZ</h1></a>
                </div>
                <div style={{width: "300px", marginLeft: "2rem"}}>
                    <p>For questions or to make
                        an appointment, email:
                        
                        hello@goodzstudio.com
                    </p>
                </div>
                </div>
                <div style={{display: 'flex'}}>
                    <div>
                        <ul style={{ listStyle: 'none', cursor: 'pointer', marginRight: '2rem' }}>
                            <li><a>Shop</a></li>
                            <li><a>Rent</a></li>
                        </ul>
                </div>
                <div>
                    <ul style={{ listStyle: 'none', cursor: "pointer" }}>
                        <li><a>Search</a></li>
                        <li><a>Press</a></li>
                        <li><a>Project</a></li>
                        <li><a>FAQ</a></li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="row" style={{textAlign: 'left'}}>
                <p> © 2021 GOODZ Studio</p>
            </div>
        </div>
    )
}

export default PublicFooter
