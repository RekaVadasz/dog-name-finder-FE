// source: https://codepen.io/madesh-mahadev/pen/LYNLMvN 

import React from 'react';
import './Loader.css';

export default function Loader() {
    return (
        <div className="loader">
            <div className="loader-dog">
                <div className="loader-dog-body">
                    <div className="loader-dog-tail">
                        <div className="loader-dog-tail">
                            <div className="loader-dog-tail">
                                <div className="loader-dog-tail">
                                    <div className="loader-dog-tail">
                                        <div className="loader-dog-tail">
                                            <div className="loader-dog-tail">
                                                <div className="loader-dog-tail"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="loader-dog-torso"></div>
                <div className="loader-dog-head">
                    <div className="loader-dog-ears">
                        <div className="loader-dog-ear"></div>
                        <div className="loader-dog-ear"></div>
                    </div>
                    <div className="loader-dog-eyes">
                        <div className="loader-dog-eye"></div>
                        <div className="loader-dog-eye"></div>
                    </div>
                    <div className="loader-dog-muzzle">
                        <div className="loader-dog-tongue"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
