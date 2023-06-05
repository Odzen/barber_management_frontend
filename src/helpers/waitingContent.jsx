import { Spin, Empty } from 'antd'

export const waitingContent = (data, loading) => {
  let waitingContent

  if (!data && !loading) {
    waitingContent = (
      <Spin size='large' className='m-4'>
        <div className='content' style={{ height: '50px' }} />
      </Spin>
    )
  } else if (!data || data.length < 1) {
    waitingContent = <Empty className='m-3' />
  } else {
    waitingContent = <div></div>
  }

  return waitingContent
}
