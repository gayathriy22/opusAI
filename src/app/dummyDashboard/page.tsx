'use client';
import { UserInfoResponse } from "@/lib/google-oauth2";
import { useEffect, useState } from "react";
import { Box, Text, Link } from '@chakra-ui/react';
import { Progress, Button, Pagination, TabsProps, Tabs } from 'antd';
import { CheckOutlined, EnterOutlined } from '@ant-design/icons';
import { Footer, Header } from "antd/es/layout/layout";
import Card from "antd/es/card/Card";
import banner from '/public/start_banner.png';

function Page() {
  const [user, setUser] = useState<UserInfoResponse | undefined>(undefined);
  const [taskJSON, setTaskJSON] = useState('<no response yet>');
  const [activeTab, setActiveTab] = useState<string>('1');
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/me`).then(x => x.json()).then(setUser)
  }, [])

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasksData = await fetch('/api/tasks').then(res => res.json());
    setTasks(tasksData);
  };

  const onChange = (key: string) => {
    console.log(key);
    setActiveTab(key);
  };

  const renderTaskCard = () => {
    if (activeTab === '1') {
      return (
        <div>
          <Card style={{ boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25)', borderWidth: '3px', borderColor: '#0788FF', borderRadius: '20px', width: '296px', height: '432px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '12px',}}>
            <Text style={{fontSize: '48px', fontWeight: 'bolder'}}>+</Text>
            <Text>Create a task</Text>
          </Card>
          <div style = {{alignItems: 'center', marginBottom: '4px'}}>
              <Pagination simple defaultCurrent={2} total={50} />
          </div>
          <div style = {{alignItems: 'center'}}>
              <Progress percent={50} size={[300, 20]} />
          </div>
        </div>
      );
    } else if (activeTab === '2') {
      return (
        <Box bg="#262626" p="32px" borderRadius="14px" width="296px" height='521px' display='flex' flexDir='column' alignItems='center'> {/* Larger gray container */}
          {tasks.map((task, index) => (
            <Card key={index} style={{ backgroundColor: 'rgba(255, 255, 255, 0.60)', borderColor: '#262626', borderRadius: '20px', width: '256px', height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="primary" style={{ width: '28px', height: '28px', borderRadius: '6px', fontSize: '20px', marginRight: '8px', background: '#B1DFFF', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={<CheckOutlined style={{color: '#262626'}}/>}></Button>
                <Button type="primary" style={{ width: '28px', height: '28px', borderRadius: '6px', fontSize: '20px', background: '#B1DFFF', display: 'flex', justifyContent: 'center', alignItems: 'center' }} icon={<EnterOutlined style={{color: '#262626'}}/>}></Button>
                <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column' }}>
                  <Text style={{ fontFamily: 'Poppins', fontSize: '12px', paddingRight: '92px', whiteSpace: 'nowrap'}}>{task.name}</Text>
                  <hr style={{ width: '120px', marginTop: '4px', borderColor: '#FFF', paddingLeft: '92px', paddingRight: '16px'}} />
                </div>
              </div>
            </Card>
          ))}
        </Box>
      );
    }
    return null;
  };


  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Today',
      // label: <SwitcherOutlined style={{ fontSize: '24px' }}/>,
    },
    {
      key: '2',
      label: 'Later',
      // label: <UnorderedListOutlined style={{ fontSize: '24px' }}/>,
    },
  ];
  

  return <div style={{ backgroundColor: '#FFF' }}>
        <Header style={{ display: 'flex', alignItems: 'center' , borderRadius: '0px 0px 20px 20px', height: '176px', backgroundColor: '#D9D9D9'}}>
            <div>
                <Text style = {{fontSize: '20px', marginTop: '88px', marginBottom: '7.56px', color: 'black', fontWeight: 'bold'}}>Hello,</Text>
                <Text style = {{fontSize: '32px', marginTop: '-38px', marginBottom: '34.57px', color: 'black', fontWeight: 'bold'}}>{user?.given_name}</Text>
            </div>
        </Header>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '-240px'}}>
                <Text style= {{fontSize: '24px', fontWeight: 'bolder', marginRight: '28px'}}>Active Tasks</Text>
            </div>
            <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} size= 'large' /> 
                {/* tabBarStyle={{ fontSize: '24px' , width: '200px'}} */}
            </div>
            <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              {renderTaskCard()}
            </div>
            
        </div>
        <Footer style={{ textAlign: 'center', backgroundColor: '#434343', marginTop: '-260px'}}>
            <Link href="#">
                <Button type="primary" style={{ textAlign: 'center', width: '104px', height: '40px', borderRadius: '20px', fontSize: '20px'}}>+</Button>
            </Link>
        </Footer>
  </div>
}


export default Page;
