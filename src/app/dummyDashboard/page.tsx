'use client';
import { UserInfoResponse } from "@/lib/google-oauth2";
import { useEffect, useState } from "react";
import { 
    Box,
    // Card, 
    // CardBody, 
    // CardFooter, 
    Divider, 
    // Button, 
    ButtonGroup, 
    Stack, 
    Heading, 
    Text, 
    Image, 
    Link,
    CardHeader
  } from '@chakra-ui/react';
  import { Progress, Button, Pagination, TabsProps, Tabs, Switch } from 'antd';
import { Footer, Header } from "antd/es/layout/layout";
import Card from "antd/es/card/Card";
import {
    UnorderedListOutlined, 
    SwitcherOutlined
  } from '@ant-design/icons';
import flashcardIcon from './public/flashcardIcon.png';
import todayListIcon from './public/todayListIcon.png';

  

function Page() {
  const [user, setUser] = useState<UserInfoResponse | undefined>(undefined);
  useEffect(() => {
    fetch(`/api/me`).then(x => x.json()).then(setUser)
  }, [])

  const onChange = (key: string) => {
    console.log(key);
  };
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <SwitcherOutlined style={{ fontSize: '24px' }}/>,
    //   children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: <UnorderedListOutlined style={{ fontSize: '24px' }}/>,
    //   children: 'Content of Tab Pane 2',
    },
  ];
  

  return <div style={{ backgroundColor: '#FFF' }}>
        {/* <div className="topbar">
            {/* <i>(This should definitely be in a component)</i> */}
            {/* <br />
            <h1>Hello</h1>
            <h1>{user?.given_name}</h1>
            <a href="/api/logout">Logout</a> */}
        {/* </div> */}
        <Header style={{ display: 'flex', alignItems: 'center' , borderRadius: '0px 0px 20px 20px', height: '176px', backgroundColor: '#D9D9D9'}}>
            <div>
                <Text style = {{fontSize: '20px', marginTop: '88px', marginBottom: '7.56px', color: 'black', fontWeight: 'bold'}}>Hello,</Text>
                <Text style = {{fontSize: '32px', marginTop: '-38px', marginBottom: '34.57px', color: 'black', fontWeight: 'bold'}}>Jenna</Text> {/* <h1>{user?.given_name}</h1> */}
            </div>
        </Header>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '-240px'}}>
                <Text style= {{fontSize: '24px', fontWeight: 'bolder', marginRight: '28px'}}>Active Tasks</Text>
                <div style={{ display: 'inline-block' , alignItems: 'center'}}>
                    <Switch checkedChildren="Today" unCheckedChildren="Later" defaultChecked />
                </div>
            </div>
            <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} size= 'large' /> 
                {/* tabBarStyle={{ fontSize: '24px' , width: '200px'}} */}
            </div>
            <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Card style={{ boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25)', borderWidth: '3px', borderColor: '#0788FF', borderRadius: '20px', width: '296px', height: '432px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '12px',}}>
                    <Text style={{fontSize: '48px', fontWeight: 'bolder'}}>+</Text>
                    <Text>Create a task</Text>
                </Card>
            </div>
            <div style = {{alignItems: 'center', marginBottom: '4px'}}>
                <Pagination simple defaultCurrent={2} total={50} />
            </div>
            <div style = {{alignItems: 'center'}}>
                <Progress percent={50} size={[300, 20]} />
            </div>
        </div>
        <Footer style={{ textAlign: 'center', backgroundColor: '#434343', marginTop: '-260px'}}>
            <Link href="#">
                <Button type="primary" style={{ textAlign: 'center', width: '104px', height: '40px', borderRadius: '20px', fontSize: '20px'}}>+</Button>
            </Link>
        </Footer>

    {/* <div className="topbar">
      <i>(This should definitely be in a component)</i>
      <br />
      <h1>Hello</h1>
      <h1>{user?.given_name}</h1>

      <Card maxW='xs'>
          <CardBody>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>Living room Sofa</Heading>
              <Box bg='tomato' w='20%' h='60%' p={4} color='white'>
              </Box> 
             <Text>
                This sofa is perfect for modern tropical spaces, baroque inspired
                spaces, earthy toned spaces and for people who love a chic design with a
                sprinkle of vintage design.
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                $450
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'>
                +
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>


      <a href="/api/logout">Logout</a>
    </div> */}
  </div>
}


export default Page;
