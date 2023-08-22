import {useState,useEffect} from 'react'
import './Styles/ProductInput.css'

const ProductInput = () => {
    const [loc,setLoc]=useState(701);
    const [barcode,setBarcode]=useState("");
    const [sudesc,setSudesc]=useState("");
    const [sudescAr,setSudescAr]=useState("");
    const[rsp,setRsp]=useState("")
    const [products,setProducts]=useState([])
    const getProductDtl= (e)=>{
        fetch(`https://localhost:7168/api/Product/GetProduct?Loc=${loc}&Barcode=${barcode}`).then(resp=>resp.json()).then(resp=>{
            console.log(resp)
            if(resp.status){
                setSudesc("Not Found")
            }else{
                setSudesc(resp.suDesc)
                setSudescAr(resp.suDesc) 
                setRsp(resp.rsp)         
            }
        })
    }

    useEffect(()=>{
        if(barcode!=''){
            getProductDtl() 
        }    
    },[barcode])

    useEffect(()=>{
        if(sudesc=='Not Found'){
            document.getElementById("sudesc").style.border="1px solid red"
        }else{
            document.getElementById("sudesc").style.border=""
        }
    },[sudesc])

    const addProducts=()=>{
        if(products.length<6){
            if(sudesc!=''){
                products.push({"barcode":barcode,"suDesc":sudesc,"sudescAr":sudescAr,"rsp":rsp})
                setBarcode('')
                setSudesc('')
                setRsp('')
                console.log(products)
            }
        }else{
            alert("Maximum 6 Products")
        }
    }

  return (
    <div className='ms-auto me-auto'>
        <div className='row p-md-3'>
            <div className='col-md-2'>
                <label>Location</label>
                <select className='form-select form-select-sm' onChange={(e)=>setLoc(e.target.value)}>
                    <option value="701">Grand Mall</option>
                    <option value="702">Ezdan</option>
                    <option value="703">Plaza 2</option>
                    <option value="704">Plaza 3</option>
                    <option value="705">Shahaniya</option>
                    <option value="706">Barwa</option>
                    <option value="707">Aziziya</option>
                    <option value="708">Umm Garn</option>
                </select>
            </div>
            <div className='col-md-3'>
                <label>Barcode</label>
                <input type='number' placeholder='barcode' value={barcode} className='form-control form-control-sm ' onChange={(e)=>setBarcode(e.target.value)} />
            </div>
            <div className='col-md-5'>
                <label>Su Description</label>
                <input type='text' id='sudesc' placeholder='su description' className='form-control form-control-sm ' value={sudesc} readOnly/>
            </div>
            <button className='btn btn-primary btn-sm col-md-2' style={{height:"30px",marginTop:"23px"}} onClick={addProducts}>ADD</button>
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
                        {products.map((resp,index)=>
                            <tr key={index}>
                                <td>{resp.barcode}</td>
                                <td>{resp.suDesc}</td>
                                <td>{resp.sudescAr}</td>
                                <td>{resp.rsp}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        <div className='row'>
            <div className='d-flex justify-content-center'>
                <div className="shelftag border" id="contents">
                    {
                    products.map((resp,index)=>
                    <div key={index} className="block block-bg">
                        <div className="prod-container  d-flex">
                            <div className="desc ">
                                <small className="desc-ar desc-text" >{resp.suDesc}</small>
                                <small className="desc-en desc-text">{resp.suDesc}</small>
                            </div>
                            <div className="price-shelf">
                                <small className="price-nor">{resp.rsp} | <span className='ar-price'>{resp.rsp}</span></small>
                            </div>
                        </div>
                    </div> ) 
                    }
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