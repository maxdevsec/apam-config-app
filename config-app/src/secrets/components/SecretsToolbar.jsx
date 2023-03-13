
import { useContext, useState } from "react";
import { SecretFilterContext } from "../../contexts/SecretFilterContext";

const SecretsToolbar = () => {
    const [searchCriteria, setSearchCriteria] = useState("");

    const {
        setSearchQuery
    } = useContext(SecretFilterContext);
    return (
        <section className="toolbar">
            <div className="container">
                <div className="justify-content-between">
                    <ul className="toolroow d-flex flex-column flex-lg-row">
                        <li className="input-group">
                            <input type="text" className="form-control" placeholder="Search..." 
                                onChange={(event) => {
                                    setSearchCriteria(event.target.value);
                                }}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type='button'
                                    onClick={() => {
                                        setSearchQuery(searchCriteria)
                                    }}>
                                    <i className='fa fa-search'/>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default SecretsToolbar;