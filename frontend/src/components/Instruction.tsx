import React from 'react';
const Instruction = () => {
    return (
        <>
        <h2>Need to Know</h2>
        <h3> Newbie: Greetings! Fill in what you like!</h3>
        <div> 
            <h3>Dear user: Welcome back!</h3> 
            <p> If you would like to modify your name card, 
                please follow the steps below:
            </p>
            <ul>
                <li>Modify directly for the things you want to change.</li>
                <li>If you want to keep the things like before, just left it blank.</li>
                <li>If you want to delete the things, type "del" (without the quotation marks)
                    in the field.</li>
            </ul>
        </div>
        </>
    );
};
export default Instruction