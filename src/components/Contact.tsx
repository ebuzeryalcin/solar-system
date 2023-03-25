import React, { useRef, useState } from "react";
import styled from "styled-components";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
`;

const Container = styled.div`
  margin-top: 25rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const Right = styled.div`
  margin-top: 6rem;
  // margin-left: 3rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // border: 1px solid #fff;

  & a {
    text-decoration: none;
    color: #da4ea2;
  }

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Input = styled.input`
  padding: 20px;
  background-color: #e8e6e6;
  border: none;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: #e8e6e6;
`;

const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  padding: 20px;
`;


const Contact: React.FC = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  return (
    <Section>
      <Container>
        <Left>
          <Form ref={ref} >
            <Title>Contact Us</Title>
            <Input placeholder="Name" name="name" />
            <Input placeholder="Email" name="email" />
            <TextArea
              placeholder="Write your message"
              name="message"
              rows={10}
            />
            <Button type="submit">Send</Button>
            {success &&
              "Your message has been sent. We'll get back to you soon :)"}
          </Form>
        </Left>
        <Right>
          <Title>Social</Title>
          <h3>
            <a href="https://github.com/ebuzeryalcin" target="_blank" rel="noopener">
              Github
            </a>
          </h3>
          <h3>
            <a href="https://www.linkedin.com/in/ebyalcin/" target="_blank" rel="noopener">
              LinkedIn
            </a>
          </h3>
          <h3>
            <a href="mailto:yalcinebuzer@gmail.com">
              E-mail
            </a>
          </h3>
          <h3>
            <a href="tel:+46739547629">
              Phone
            </a>
          </h3>
        </Right>
      </Container>
    </Section>
  );
};

export default Contact;
