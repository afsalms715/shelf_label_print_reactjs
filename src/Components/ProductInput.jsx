import {useState,useEffect} from 'react'
import './Styles/ProductInput.css'

const ProductInput = () => {
    const [loc,setLoc]=useState(701);
    const [barcode,setBarcode]=useState();
    const [sudesc,setSudesc]=useState("");
    const getProductDtl= (e)=>{
        fetch("https://localhost:44391/api/ProductDtl/product?barcode=1415&loc=701").then(resp=>resp.json()).then(resp=>{
            console.log(resp)
        })
    }
    useEffect(()=>{
        console.log(loc)
        console.log(barcode)
        console.log(sudesc)
    },[loc,barcode,sudesc])

  return (
    <div className='ms-auto me-auto'>
        <div className='row p-md-3'>
            <div className='col-md-2'>
                <label>Location</label>
                <select className='form-select form-select-sm' onChange={(e)=>setLoc(e.target.value)}>
                    <option value="701">Grand Mall</option>
                    <option value="702">Ezdan</option>
                </select>
            </div>
            <div className='col-md-3'>
                <label>Barcode</label>
                <input type='number' placeholder='barcode' value={barcode} className='form-control form-control-sm ' onChange={(e)=>setBarcode(e.target.value)} />
            </div>
            <div className='col-md-5'>
                <label>Su Description</label>
                <input type='text' placeholder='su description' className='form-control form-control-sm ' value={sudesc} readOnly/>
            </div>
            <button className='btn btn-primary btn-sm col-md-2' style={{height:"30px",marginTop:"23px"}} onClick={(e)=>getProductDtl(e)}>ADD</button>
        </div>
        <div className='row p-md-3'>
            <div className='col'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">Barcode</th>
                            <th scope="col">Su Description</th>
                            <th scope="col">Su Description Arabic</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className='row'>
            <div className='d-flex justify-content-center'>
                <div className="shelftag border" id="contents">
                    <div className="block block-bg">
                        <div className="prod-container  d-flex">
                            <div className="desc ">
                                <small className="desc-ar desc-text" >test</small>
                                <small className="desc-en desc-text">test</small>
                            </div>
                            <div className="price-shelf">
                                <small className="price-nor">12</small>
                            </div>
                        </div>
                    </div>                       
                </div>  
            </div>
        </div>
        <div className='row p-md-3'>
            <button className='btn btn-success btn-sm col w-100'>Generate PDF</button>
        </div>
    </div>
  )
}

export default ProductInput