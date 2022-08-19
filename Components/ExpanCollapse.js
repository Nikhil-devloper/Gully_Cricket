import React from 'react';
import Image from 'next/image';




class ExpandCollapse extends React.Component {

    state = {
        openState: false
    }

    handleClick = () => {
        this.setState({ openState: !this.state.openState });
    }



    render() {




        return (
            <div className={'mt-4'} key={this.props.key}>

                <div className='bg-primary-lightBlack p-4' >

                    <div className='text-4xl'>
                        {this.props.displayText}
                    </div>

                    {<span className={`float-right relative bottom-10 ${this.state.openState ? 'rotate-180 -top-11' : ''}`} onClick={this.handleClick}>
                        <Image src='/image/arrow.png' alt='arrow' height={40} width={40} />
                    </span>
                    }
                </div>
                {this.state.openState ? <div className='mt-2 mb-2'>
                    {this.props.children}
                </div> : null}


            </div>
        )
    }
};


export default ExpandCollapse;
