// import * as React from 'react'
// import Button from '@material-ui/core/Button'
// import Dialog from '@material-ui/core/Dialog'
// import DialogActions from '@material-ui/core/DialogActions'
// import DialogContent from '@material-ui/core/DialogContent'
// import DialogTitle from '@material-ui/core/DialogTitle'
// import withMobileDialog from '@material-ui/core/withMobileDialog'
//
// interface ResponsiveDialogProps {
//   title?: string | React.ReactNode
//   children?: React.ReactNode,
//   onClose?: () => void,
//   actions?: React.ReactNode
// }
//
// class ResponsiveDialog extends React.Component<ResponsiveDialogProps, {}> {
//   render() {
//     const { title, children, actions, onClose, fullScreen } = this.props
//
//     return (
//       <div>
//         <Dialog
//           fullScreen={fullScreen}
//           onClose={onClose}
//           aria-labelledby="responsive-dialog-title"
//         >
//           {title && (
//             <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
//           )}
//           <DialogContent>
//             {children}
//           </DialogContent>
//           {actions && (
//             <DialogActions>
//               {actions}
//               <Button onClick={this.handleClose} color="secondary">
//                 Cancel/Back
//               </Button>
//               <Button onClick={this.handleClose} color="primary" autoFocus>
//                 Edit/Save/Add
//               </Button>
//             </DialogActions>
//           )}
//         </Dialog>
//       </div>
//     )
//   }
// }
//
// export default withMobileDialog()(ResponsiveDialog)
