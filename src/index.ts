import * as htmlparser2 from 'htmlparser2'

export function transfer(tableStr: string) {
  try {
    const ast = htmlparser2.parseDocument(tableStr)
    const children = ast.children as any
    const result: any = {
      props: {},
    }
    for (const child of children) {
      if (child.name !== 'table')
        continue

      const _children = child.children
      const thead = _children
        .find((item: any) => item.name === 'thead')
        .children[0].children.map((c: any) => c.children[0].data)
      const tbody = _children
        .find((item: any) => item.name === 'tbody')
        .children.map((c: any) =>
          c.children
            .map((i: any) => {
              let target = i.children
              if (!target)
                return false
              target = target[0]
              if (target.type === 'text')
                return target.data
              return target.children[0].data
            })
            .filter(Boolean),
        )
      if (thead.includes('Value')) {
        // 属性
        tbody.forEach((item: any) => {
          const [name, type, value, description] = item
          result.props[name] = {
            value: '',
            description,
            default: value,
            type,
          }
        })
        return JSON.stringify(result, null, 4)
      }
      else if (thead.includes('Element')) {
        // events
        const events: any = []
        tbody.forEach((item: any) => {
          const [name, type, element, response, description] = item
          events.push({
            name,
            description,
            params: response,
          })
        })
        return JSON.stringify({ events }, null, 4)
      }
    }
  }
  catch (error) {
    return ''
  }
}

// console.log(transfer(`
// <table class="table" role="grid"><thead class="table-head "><tr><th class="" xt-marked="ok">Name</th><th class="" xt-marked="ok">Type</th><th class="" xt-marked="ok">Value</th><th class="" xt-marked="ok">Description</th></tr></thead> <tbody class="table-body "><tr aria-rowindex="1"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">autocollapse<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">boolean</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">false</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Set the auto-collapse mode.</td> </tr><tr aria-rowindex="2"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">width<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">string</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">'w-full'</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Provide classes to set the accordion width.</td> </tr><tr aria-rowindex="3"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">spacing<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">string</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">'space-y-1'</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Provide classes to set the vertical spacing between items.</td> </tr><tr aria-rowindex="4"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">disabled<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">boolean</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">false</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Set the accordion disabled state for all items.</td> </tr><tr aria-rowindex="5"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">padding<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">string</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">'py-2 px-4'</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Provide classes to set the accordion item padding styles.</td> </tr><tr aria-rowindex="6"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">hover<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">string</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">'hover:bg-primary-hover-token'</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Provide classes to set the accordion item hover styles.</td> </tr><tr aria-rowindex="7"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">rounded<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">string</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">'rounded-container-token'</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Provide classes to set the accordion item rounded styles.</td> </tr><tr aria-rowindex="8"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">caretOpen<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">string</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">'rotate-180'</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Set the rotation of the item caret in the open state.</td> </tr><tr aria-rowindex="9"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">caretClosed<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">string</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">-</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Set the rotation of the item caret in the closed state.</td> </tr><tr aria-rowindex="10"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">regionControl<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">string</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">-</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Provide arbitrary classes to the trigger button region.</td> </tr><tr aria-rowindex="11"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">regionPanel<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">string</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">'space-y-4'</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Provide arbitrary classes to the content panel region.</td> </tr><tr aria-rowindex="12"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">regionCaret<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">string</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">-</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Provide arbitrary classes to the caret icon region.</td> </tr><tr aria-rowindex="13"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">transitions<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">boolean</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">!$prefersReducedMotionStore</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Enable/Disable transitions</td> </tr><tr aria-rowindex="14"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">transitionIn<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">TransitionIn</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">-</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Provide the transition to used on entry.</td> </tr><tr aria-rowindex="15"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">transitionInParams<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">TransitionParams</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">{ duration: 200 }</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Transition params provided to \`transitionIn\`.</td> </tr><tr aria-rowindex="16"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">transitionOut<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">TransitionOut</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">-</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Provide the transition to used on exit.</td> </tr><tr aria-rowindex="17"><td class="" role="gridcell" aria-colindex="1" tabindex="0"><code class="code">transitionOutParams<!--?code--></code></td><td class="" role="gridcell" aria-colindex="2" tabindex="-1"><em xt-marked="ok">TransitionParams</em></td><td class="" role="gridcell" aria-colindex="3" tabindex="-1" xt-marked="ok">{ duration: 200 }</td><td class="" role="gridcell" aria-colindex="4" tabindex="-1" xt-marked="ok">Transition params provided to \`transitionOut\`.</td> </tr></tbody> </table>
// `))
