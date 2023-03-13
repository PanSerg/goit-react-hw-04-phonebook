import React from "react";
import PropTypes from 'prop-types';
import { ContactStyle } from "./contacts.styled";
import { ButtonsStyle } from "components/buttonsStyle.styled";

export const Contact = ({ dataContact, onDelete }) => {
    return (
        <ContactStyle>
            <h2>Contacts</h2>
            <ul>
                {dataContact.map(data => (
                    <li key={data.id}>
                        {data.name}: {data.number}
                        <ButtonsStyle type="button"
                            onClick={() => {
                                onDelete(data.id);
                            }}
                        >Delete</ButtonsStyle>
                    </li>
                ))}
            </ul>
        </ContactStyle>
    );
};

Contact.propTypes = {
    dataContact: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
};