import React from 'react'
import './Styles/ProductInput.css'

const ProductInput = () => {
    const getProductDtl= ()=>{
        
    }

  return (
    <div>
        <div className='row p-md-3'>
            <div className='col-md-2'>
                <label>Location</label>
                <select className='form-select form-select-sm'>
                    <option>Grand Mall</option>
                    <option>Ezdan</option>
                </select>
            </div>
            <div className='col-md-3'>
                <label>Barcode</label>
                <input type='number' placeholder='barcode' className='form-control form-control-sm ' />
            </div>
            <div className='col-md-5'>
                <label>Su Description</label>
                <input type='text' placeholder='su description' className='form-control form-control-sm ' readOnly/>
            </div>
            <button className='btn btn-primary btn-sm col-md-2' style={{height:"30px",marginTop:"23px"}}>ADD</button>
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
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className='row'>
            <div className='d-flex justify-content-center'>
                <div class="shelftag border" id="contents">
                    <div class="block block-bg">
                        <div class="prod-container  d-flex">
                            <div class="desc ">
                                <small class="desc-ar desc-text" >test</small>
                                <small class="desc-en desc-text">test</small>
                            </div>
                            <div class="price-shelf">
                                <small class="price-nor">12</small>
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