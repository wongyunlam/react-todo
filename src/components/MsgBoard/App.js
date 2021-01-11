import React, {useState, useEffect} from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const API_ENDPOINT = 'https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc'

const Page = styled.div`
  width: 400px;
  margin: 0 auto
`

const Title = styled.h2`
  color: #0abab5;
`

const MessageForm = styled.form``

const MessageTextArea = styled.textarea`
  display: block;
  width: 100%;
`

const SubmitButton = styled.button`
  margin-top: 8px;
`

const MessageList = styled.div`
  margin-top: 16px;
`
const MessageContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  border: 1px solid black;
  & + & {
    margin-top: 16px;
  }
`

const MessageHead = styled.div`
  color: #0abab5;
  padding-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3)
`

const MessageAuthor = styled.div`
  font-size: 14px
`

const MessageTime = styled.div`
  color: rgba(23, 78, 55, 0.67);
  font-size: 12px
`

const MessageBody = styled.div`
  margin-top: 16px;
  font-size: 16px
`

const ErrorMessage = styled.div`
  margin-top: 16px;
  color: red;
`

const EmptyMessage = styled.div`
  margin-top: 16px;
  color: red;
`

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Message({author, time, children}) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageBody>
        {children}
      </MessageBody>
    </MessageContainer>
  )
}

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node
}

function App() {
  const [messages, setMessages] = useState(null)
  const [messageApiError, setMessageApiError] = useState(null)
  const [value, setValue] = useState()
  const [postMessageError, setPostMessageError] = useState()
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false)

  const fetchMessages = () => {
    return fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data)
      })
      .catch(err => {
        setMessageApiError(err.message)
      })
  }

  const handleTextAreaChange = (e) => {
    setValue(e.target.value)
  }

  const handleTextAreaFocus = () => {
    setPostMessageError(null)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoadingPostMessage) return;
    setIsLoadingPostMessage(true);
    fetch('https://student-json-api.lidemy.me/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        nickname: 'Jay',
        body: value
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      setIsLoadingPostMessage(false);
      if (data.ok === 0) {
        setPostMessageError(data.message)
        return;
      }
      setValue('')
      fetchMessages()
    })
    .catch(err => {
      setIsLoadingPostMessage(false);
      setPostMessageError(err.message)
    })
  }
  

  useEffect(() => {
    fetchMessages();
  }, []) 

  return (
    <Page>
      {isLoadingPostMessage && <Loading>Loading</Loading>}
      <Title>留言版</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextArea value={value} 
        onChange={handleTextAreaChange} 
        onFocus={handleTextAreaFocus} 
        rows={15} />
        <SubmitButton>提交</SubmitButton>
        {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
      </MessageForm>
        {messageApiError && (
          <ErrorMessage>
          Something went wrong. ({messageApiError.toString()})
          </ErrorMessage>
        )}
        {messages && messages.length === 0 && <EmptyMessage>No message.</EmptyMessage>}
      <MessageList>
        {messages && 
          messages.map(message => (
            <Message key={message.id} author={message.nickname} time={new Date(message.createdAt).toLocaleString()}>
              {message.body}
            </Message>
          ))}
      </MessageList>
    </Page>
  )
}

export default App;
